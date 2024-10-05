import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from './topic.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, {
    // on delete user, remove this comment
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.comments, {
    // on delete topic, remove this comment
    onDelete: 'CASCADE',
  })
  topic: Topic;

  @Column({ default: new Date().toISOString() })
  createdAt: Date;

  @Column({ default: new Date().toISOString() })
  updatedAt: Date;
}
