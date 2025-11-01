from pydantic import BaseModel

class CarBase(BaseModel):
    brand: str
    model: str
    year: int
    power: float
    torque: float
    weight: float
    traction: str
    vmax: float
    category: str

class CarCreate(CarBase):
    pass

class CarResponse(CarBase):
    id: int
    class Config:
        from_attributes = True
