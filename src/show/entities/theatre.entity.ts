import {Column, Entity, Index, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Show} from './show.entity' 
import {Reservation} from '../../reservation/entities/reservation.entity'

@Entity({
    name: 'theatre'
})
export class Theatre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', unique: true, nullable: false})
    name: string

    @Column({type: 'integer', nullable: false})
    seat: number

    @Column({type: 'integer', nullable: false})
    seat_max: number

    @ManyToOne(()=> Reservation, (reservation) => reservation.theTheatre, {
        onDelete: 'CASCADE'
    })
    reservation: Reservation[]

    @OneToOne(()=> Show, (show) => show.theTheatre)
    show: Show[]
}