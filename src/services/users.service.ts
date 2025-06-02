import { Util } from "../utils/util";
import { User, UsersCache } from "./model/user";
import UserService from "./user.service";

const LOCALSTORAGE_KEY = "users"; 

export class _UsersService {

    public async getUsers(): Promise<User[]> {
        let users = this.getFromLocalStorage()
        if (users?.length) {
            return users
        }
        await this.loadUsersFromFirestore()
        users = this.getFromLocalStorage()
        return users || []
    }

    private getFromLocalStorage = (): User[] => {
        const usersString = localStorage.getItem(LOCALSTORAGE_KEY);
        let usersCache: UsersCache | null = null;
        if (usersString) {
            try {
            usersCache = JSON.parse(usersString);
            } catch (e) {
            console.error("Error parsing users from localStorage:", e);
            return [];
            }
        }

        if (!usersCache?.date) {
            return [];
        }
        const cacheDate = new Date(usersCache.date);

        if (Util.beforeToday(cacheDate)) {
            console.warn("Users cache is older than today, returning empty array");
            return [];
        }
        console.log("Users from localStorage:", usersCache);
        return usersCache.users || [];
    };

    private loadUsersFromFirestore = async () => {
        const users = await UserService.listUsers()
        const usersCache: UsersCache = {
            users: users,
            date: new Date(),
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(usersCache));
        console.warn("Usets loaded from Firestore:", usersCache);
    };

}

const usersService = new _UsersService()
export default usersService
