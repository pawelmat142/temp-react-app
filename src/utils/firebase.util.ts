import { User } from "firebase/auth";

export abstract class FsUtil {

    public static prepareDisplayName(user?: User): string {
        const name = user?.email?.split('@')[0]
        return user?.displayName || name || 'User'
    }

}