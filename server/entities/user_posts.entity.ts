import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import User from '../entities/user.entity';
import UserPostsCategories from '../entities/user_posts_categories.entity';
import UserPostsLikes from '../entities/user_posts_likes.entity';

@Entity()
class UserPosts {
	@PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: "smallint" })
    public user_id: number;
    
	@Column({ type: "text" })
    public playlist: string;

    @Column({ type: "smallint", default: 0 })
    public likes: number;

    @Column({ type: "smallint", default: 0 })
    public shares: number;

    @Column({ type: "text", default: '' })
    public twitch_link: string;

    @Column({ type: "text", default: '' })
    public mixer: string;

    @Column({ type: "smallint", default: 0 })
    public is_featured: number;

    @Column({ type: "smallint", default: 0 })
    public is_approved: number;

    @ManyToOne(type => User, user => user.posts)
    public user: User;

    @OneToMany(type => UserPostsCategories, userPostsCategories => userPostsCategories.userpost)
    public userPostsCategories: UserPostsCategories[];

    @OneToMany(type => UserPostsLikes, userPostLikes => userPostLikes.userpost)
    public userPostLikes: UserPostsLikes[];
}

export default UserPosts;