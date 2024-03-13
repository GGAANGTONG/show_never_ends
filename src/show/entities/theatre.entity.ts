import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

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

}