import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as leveldb from "level";
import { UserUpdateDto } from "./dtos/user-update.dto";
@Injectable()
export class UserService {
    async findAll() {
        const result = []
        const db = leveldb("./db", { valueEncoding: "json" })
        await db.open()
        for await (const [key, value] of db.iterator()) {
            result.push(value)
        }
        await db.close()
        return result
    }
    async delete(id: number) {
        const db = leveldb("./db", { valueEncoding: "json" })
        await db.open()
        try {
            await db.get(id)
            await db.del(id)
        } catch (error) {
            return false
        } finally {
            await db.close()
        }
        return true
    }
    async findFirst(name: string) {
        let result = null
        const db = leveldb("./db", { valueEncoding: "json" })
        await db.open()
        for await (const [key, value] of db.iterator()) {
            if (value.name === name) {
                result = value
            }
        }
        await db.close()
        return result
    }
    async update(id: number, content: Partial<UserUpdateDto>) {
        const db = leveldb("./db", { valueEncoding: "json" })
        await db.open()
        try {
            let user = await db.get(id)
            Object.assign(user, content)
            db.put(id, user)
            return user
        } catch (error) {
            return false
        } finally {
            await db.close()
        }

    }

    async create(id: number, content: UserUpdateDto) {
        const db = leveldb("./db", { valueEncoding: "json" })
        await db.open()
        try {
            await db.get(id)
            await db.close()
            return false
        } catch (error) {
            await db.put(id, content)
            await db.close()
            return true
        }

    }
}