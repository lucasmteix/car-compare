from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import db_connection, models, schemas
from db_connection import Base

Base.metadata.create_all(bind=db_connection.engine)

app = FastAPI(title="CarCompare API")

@app.get("/")
def root():
    return {"message": "API CarCompare está rodando! Use /cars para gerenciar carros."}

@app.get("/cars", response_model=list[schemas.CarResponse])
def get_cars(db: Session = Depends(db_connection.get_db)):
    return db.query(models.Car).all()

@app.get("/cars/{car_id}", response_model=schemas.CarResponse)
def get_car(car_id: int, db: Session = Depends(db_connection.get_db)):
    car = db.query(models.Car).filter(models.Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    return car

@app.post("/cars", response_model=schemas.CarResponse)
def create_car(car: schemas.CarCreate, db: Session = Depends(db_connection.get_db)):
    new_car = models.Car(**car.dict())
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car

@app.put("/cars/{car_id}", response_model=schemas.CarResponse)
def update_car(car_id: int, updated: schemas.CarCreate, db: Session = Depends(db_connection.get_db)):
    car = db.query(models.Car).filter(models.Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    for field, value in updated.dict().items():
        setattr(car, field, value)
    db.commit()
    db.refresh(car)
    return car

@app.delete("/cars/{car_id}")
def delete_car(car_id: int, db: Session = Depends(db_connection.get_db)):
    car = db.query(models.Car).filter(models.Car.id == car_id).first()
    if not car:
        raise HTTPException(status_code=404, detail="Carro não encontrado")
    db.delete(car)
    db.commit()
    return {"message": "Carro deletado com sucesso"}
