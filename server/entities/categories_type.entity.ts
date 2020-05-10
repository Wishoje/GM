import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CategoriesType {
	@PrimaryGeneratedColumn()
    public id: number;
    
	@Column({ type: "text", default: "" })
    public category_type: string;
}

export default CategoriesType;