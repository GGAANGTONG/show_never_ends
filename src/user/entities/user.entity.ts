import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {Role} from '../types/userRole.type'
import {Category} from '../../show/types/category.type'

@Index('email', ['email'], {unique: true})
@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', unique: true, nullable: false})
    email: string

    @Column({type: 'varchar', nullable: false})
    password: string

    @Column({type: 'varchar', nullable: false})
    name: string

    @Column({type: 'varchar', unique: true, nullable: false})
    nickname: string

    @Column({type: 'enum', default: Role.Customer, nullable: false})
    role: Role

    @Column({type: 'string', unique: true, nullable: false})
    phone: number

    @Column({type: 'enum', default: Category.romance, nullable: false})
    preference: Category

    @Column({type: 'integer', default: 1000000, nullable: false})
    point: number
}