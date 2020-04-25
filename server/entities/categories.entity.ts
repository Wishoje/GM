import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Categories {
	@PrimaryGeneratedColumn()
    public id: number;
    
	@Column()
    public name: string;

    @Column("smallint")
    public active: number;
}

export default Categories;