import {Column, Entity, Index, OneToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import {Category} from '../../show/types/category.type'

const currentDate = new Date();
const newDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);

@Index('email', ['email'], {unique: true})
@Entity({
    name: 'show'
})
export class Show {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', unique: true, nullable: false})
    name: string

    @Column({type: 'enum', default: Category.romance, nullable: false})
    category: Category

    @Column({type: 'text', nullable: true})
    intro: string

    @Column({type: 'text', nullable: true})
    photos: string

    @Column({type: 'text', nullable: false})
    content: string

    @Column({type: 'text', nullable: false})
    actors: string

    @Column({type: 'integer', nullable: false})
    price: number

    @Column({type: 'datetime', default: new Date(), nullable: false})
    firstShow: Date

    @Column({type: 'datetime', default: newDate, nullable: false})
    lastShow: Date

    @ManyToOne(()=> User, (user) => user.email)
    user: User[];

}


