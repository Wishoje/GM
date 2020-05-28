import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserPostsCategories {
	@PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "smallint" })
    public user_post_id: number;

    @Column({ type: "smallint" })
    public category_id: number;
}

export default UserPostsCategories;