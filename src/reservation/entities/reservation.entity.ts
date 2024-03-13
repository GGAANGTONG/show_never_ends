import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

import {User} from '../../user/entities/user.entity'
import {Show} from '../../show/entities/show.entity'
import {Theatre} from '../../show/entities/theatre.entity'

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
    theTheatre: string

    @Column({type: 'integer', nullable: false})
    seat: number

    @Column({type: 'integer', nullable: false})
    price: number

    @Column({type: 'datetime', nullable: false})
    date: Date


    @ManyToOne(()=> User, (user) => user.email, {
        onDelete: 'CASCADE'
    })
    user: User[];

    @ManyToOne(()=> Show, (show)=> show.name, {
        onDelete: 'CASCADE'
    })
    show: Show[];

    @OneToMany(()=> Theatre, (theatre) => theatre.name, {
        onDelete: 'CASCADE'
    })
    theatre: Theatre[]
}
