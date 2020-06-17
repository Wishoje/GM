import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import UserPosts from '../entities/user_posts.entity';
import User from '../entities/user.entity';

@Entity()
class UserPostsLikes {
	@PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(type => UserPosts, userpost => userpost.userPostLikes)
    public userpost: UserPosts;

    @ManyToOne(type => User, user => user.id)
    public user: User;
}

export default UserPostsLikes;