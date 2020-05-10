import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Categories {
	@PrimaryGeneratedColumn()
    public id: number;
    
	@Column({ type: "text", default: "" })
    public name: string;

    @Column({ type: "smallint", default: 0 })
    public active: number;

    @Column({ type: "smallint", default: 0 })
    public sort: number;

    @Column({ type: "text", default: "" })
    public image: string;

    @Column({ type: "smallint", default: 0 })
    public type: number;
}

export default Categories;