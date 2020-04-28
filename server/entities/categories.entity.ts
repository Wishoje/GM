import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Categories {
	@PrimaryGeneratedColumn()
    public id: number;
    
	@Column({ type: "text" })
    public name: string;

    @Column({ type: "smallint" })
    public active: number;

    @Column({ type: "smallint" })
    public sort: number;

    @Column({ type: "text" })
    public image: string;
}

export default Categories;