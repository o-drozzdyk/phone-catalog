import { TeamMember } from '../../components/TeamMember/TeamMember';
import style from './ContactsPage.module.scss';
import { team } from './Team';

export const ContactsPage = () => {
  return (
    <div className={style.ContactsPage}>
      <div className={style.ContactsPage__description}>
        <h1 className={style.ContactsPage__title}>About Us</h1>

        <p className={style.ContactsPage__text}>
          Throughout the execution of our group project, we demonstrated a high
          level of collaboration and effective teamwork. Our team was an
          embodiment of mutual support and joint efforts in achieving a common
          goal.
          <br />
          <br />
          From the very beginning of the project, we defined roles and
          responsibilities for each team member. This allowed us to efficiently
          allocate tasks, taking into account the individual skills of each team
          member. Regular meetings and open exchange of opinions contributed to
          understanding each team member&apos;s perspective, strengthening our
          mutual understanding.
          <br />
          <br />
          We faced difficulties and challenges, but thanks to our cohesion and
          commitment to shared success, we found creative solutions and overcame
          obstacles. An important element of our teamwork was openness to
          feedback and a willingness to adjust our strategy when necessary.
          <br />
          <br />
          In the end, our project became a successful result of collective
          efforts. We achieved our goals thanks to our strong team cohesion and
          commitment to excellence.
        </p>
      </div>

      <div className={style.ContactsPage__teamMembers}>
        {team.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};
