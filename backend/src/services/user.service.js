import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs'
import jwtConfig from "../configs/jwt.config.js";
export class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractUserData(payload) {
        const user = {
            username: payload.username,
            password: payload.password,
            email: payload.email,
            name: payload.name || '',
            lastname: payload.lastname || '',
            address: payload.address || '',
            city: payload.city || '',
            phone: payload.phone || '',
        };
        // Remove undefined fields
        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }
    async create(payload) {
        const user = this.extractUserData(payload);
        try {
            const result = await this.User.findOneAndUpdate(
                user,
                {
                    $set: { roles: ['user'] },
                    $currentDate: { createdAt: true }
                },
                {
                    returnDocument: "after",
                    upsert: true
                }
            );
            return result.value;
        } catch (error) {
            return [];
        }
    }
    async updateRefreshToken(id, token) {
        try {
            let expiredAt = new Date();
            expiredAt.setSeconds(expiredAt.getSeconds() + jwtConfig.jwtRefreshExpiration);
            const update = {
                refreshToken: token,
                tokenExpired: expiredAt
            }
            const filter = {
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            };
            const result = await this.User.findOneAndUpdate(
                filter,
                {
                    $set: update,
                    $currentDate: { updatedAt: true }
                },
                { returnDocument: "after" }
            );
            console.log('updateRefreshToken');
            console.log(await this.findById(id));
            console.log(result);
            return true;
        } catch (err) {
            console.log(err)
            return false
        }
    }
    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
    async findByUsername(username) {
        return await this.find({
            username: { $regex: new RegExp(username), $options: "i" },
        });
    }
    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }
}