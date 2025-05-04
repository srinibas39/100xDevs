"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.user.create({
        data: {
            username,
            email,
            password
        }
    });
    console.log("res", res);
});
const updateUser = (id_1, _a) => __awaiter(void 0, [id_1, _a], void 0, function* (id, { username, email, password }) {
    try {
        const response = yield prisma.user.update({
            where: { id },
            data: { username, email, password }
        });
        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.findFirst({
            where: {
                id: id
            }
        });
        console.log("response", response);
    }
    catch (e) {
        console.log(e);
    }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.user.delete({
            where: { id }
        });
        console.log(response);
    }
    catch (e) {
        console.log(e);
    }
});
const createTodo = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, description, done, userId }) {
    const response = yield prisma.todo.create({
        data: {
            title,
            description,
            done,
            userId
        }
    });
    console.log(response);
});
const getTodos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todo.findMany({
        where: {
            userId: userId
        }
    });
    console.log("res", res);
});
const getTodosAndUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.todo.findMany({
        where: {
            userId: userId
        },
        select: {
            user: {
                select: {
                    username: true,
                    email: true
                }
            },
            title: true,
            description: true
        }
    });
    console.log("response", res);
});
// insertUser("sri","sri@gmail.com","1234");
// updateUser(1,{username:"bs",email:"bs@gmail.com",password:"12345"})
// getUser(1);
// deleteUser(1);
// createTodo({title:"Date",description:"Going to date",done:false,userId:2})
// getTodos(2);
getTodosAndUserDetails(2);
