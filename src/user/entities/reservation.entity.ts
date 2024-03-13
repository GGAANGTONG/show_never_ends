import {Column, Entity, Index, ManyToOne, OneToMany,PrimaryGeneratedColumn} from 'typeorm'

import {User} from './user.entity'
import {Show} from '../../show/entities/show.entity'


@Entity({
    name: 'reservation'
})
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: false})
    user_email: string

    @Column({type: 'varchar', nullable: false})
    user_nickname: string

    @Column({type: 'varchar', nullable: false})
    show_name: string

    @Column({type: 'varchar', nullable: false})
    theatre: string

    @Column({type: 'integer', nullable: false})
    seat: number

    @Column({type: 'integer', nullable: false})
    price: number

    @ManyToOne(()=> User, (user) => user.email)
    user: User[];

    @OneToMany(()=> Show, (show) => show.name)
    show: Show[];
}