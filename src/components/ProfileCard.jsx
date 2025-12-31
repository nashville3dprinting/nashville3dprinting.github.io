import "../css/ProfileCard.css";

export default function ProfileCard({ person, className = "" }) {
  const { name, title, photo, bio, email } = person;
  return (
    <article className={`profile-card ${className}`}>
      <img className="profile-photo" src={photo} alt={name} />
      <div className="profile-meta">
        <h3 className="profile-name">{name}</h3>
        {title && <p className="profile-title">{title}</p>}
        {bio && <p className="profile-bio">{bio}</p>}
        {email && (
          <p className="profile-contact">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>
    </article>
  );
}
