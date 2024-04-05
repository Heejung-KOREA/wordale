from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'TRAIN'

#정답을 확인
@app.get('/answer')
def get_answer():
    #return answer
    return {'answer':answer} #객체로 전달

app.mount("/", StaticFiles(directory="static", html=True), name="static")