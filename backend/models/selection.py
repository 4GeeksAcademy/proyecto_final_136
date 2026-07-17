from database import db

class WorldCupSelection(db.Model):
    __tablename__ = "world_cup_selection"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    team_name = db.Column(db.String, nullable=False)
    group = db.Column(db.String, nullable=False)
    phase = db.Column(db.String, nullable=False)

    user = db.relationship('User', backref='selections')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "team_name": self.team_name,
            "group": self.group,
            "phase": self.phase,
        }
