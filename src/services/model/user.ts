import { UserInfo } from "firebase/auth"

export interface User {
    uid: string
    name: string
    email?: string
    displayName?: string
    provider?: 'google' | 'github' | 'email'
    settings?: UserSettings,
    userInfo?: UserInfo
}

export interface UserSettings {
    visibleByStrangers?: boolean
}

export interface UsersCache {
    users: User[]
    date: Date
}