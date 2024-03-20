export interface Person {
    person_id: string,
    photo: File | null,
    name: string,
    vk: string,
    tg: string,
    small_about_me: string,
    big_about_me: string
    interests: Array<[string, number | null]>
}