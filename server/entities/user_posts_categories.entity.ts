import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import UserPosts from '../entities/user_posts.entity';

@Entity()
class UserPostsCategories {
	@PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "smallint" })
    public category_id: number;

    @Column({ type: "text" })
    public category_name: string;

    @ManyToOne(type => UserPosts, userpost => userpost.userPostsCategories)
    public userpost: UserPosts;
}

export default UserPostsCategories;