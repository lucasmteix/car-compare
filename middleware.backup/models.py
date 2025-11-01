from sqlalchemy import Column, Integer, String, Float
import db_connection

class Car(db_connection.Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String(50))
    model = Column(String(50))
    year = Column(Integer)
    power = Column(Float)
    torque = Column(Float)
    weight = Column(Float)
    traction = Column(String(50))
    vmax = Column(Float)
    category = Column(String(50))
