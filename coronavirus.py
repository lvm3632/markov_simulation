import random
import json

estados = [("Contagiado","con","si"),("Contagiado","sin","si"),("Contagiado","con","no"),("Contagiado","sin","no"),
("Sano","con","si"),("Sano","sin","si"),("Sano","con","no"),("Sano","sin","no"),
("Recuperado","con","si"),("Recuperado","sin","si"),("Recuperado","con","no"),("Recuperado","sin","no"),
("Muerto","no aplica","no aplica")]

#contaggiado sin , sano con .7
#contagiado con, sano sin .05
#ambos con .015
probsPorCubrebocasSano = [
    #Contagiado,,Sano
    [.05,.95],#contagiado con, sano con
    [.015,.985],#contagiado con, sano csin
    [.7,.3],#contagiado sin, sano scon
    [.9,.1]#contagiado sin, sano sin
]

probsPorCubrebocasRec = [
    #Contagiado,,Sano
    [0,0],#contagiado con, recuperado con
    [.5,.5],#contagiado con, recuperado csin
    [.3,.7],#contagiado sin, recuperado scon
    [1,1]#contagiado sin, recuperado sin
]

probsPorVacuna = [
    #Contagiarse,,No contagiarse
    [.15,.85],#vacunado
    [1,0]#no vacunado
]

probsMuerte = [
    #morir,,no morir,,recuperarse
    [.05,.95,1],#vacunado
    [.55,.45,.5]#no vacunado
]

inppobl = input("Ingresa el tamaño de la poblacion:\n")
npobl=0
inp = True
while inp:
    try:
        npobl = int(inppobl)
        inp = False
    except:
        print("Por favor ingresa un numero")
        inppobl = input("Ingresa el tamaño de la poblacion:\n")

inpdias = input("Ingresa el numero de dias a nalizar:\n")
ndias=0
inp = True
while inp:
    try:
        ndias = int(inpdias)
        inp = False
    except:
        print("Por favor ingresa un numero")
        inpdias = input("Ingresa el numero de dias a nalizar:\n")

nfilas = npobl//10
residuo = npobl%10

poblacion = []

for i in range(nfilas):
    fila = []
    for j in range(10):
        fila.append(random.randint(0,7))
    poblacion.append(fila)

if residuo>0:
    fila=[]
    for i in range(residuo):
        fila.append(random.randint(0,7))
    poblacion.append(fila)

resDias = []

def toJson(pob):
    contagiados=0
    sanos=0
    recuperados=0
    muertos=0
    for l in pob:
        for el in l:
            if el < 4:
                contagiados = contagiados+1
            elif el < 8:
                sanos=sanos+1
            elif el < 12:
                recuperados=recuperados+1
            else:
                muertos=muertos+1
    obj = {
        'Contagiados' : contagiados,
        'Sanos' : sanos,
        'Recuperados' : recuperados,
        'Muertos' : muertos,
        'Clasificaion' : (contagiados+muertos) / (contagiados+muertos+sanos+recuperados),
        'Poblacion' : pob
    }
    resDias.append(obj)

def alrededorContagiado(pob,i,j):
    if i>0:
        if j>0:
            if pob[i-1][j-1] < 4:
                return i-1,j-1
            if pob[i-1][j] < 4:
                return i-1,j
            if pob[i][j-1] < 4:
                return i,j-1
        if j<len(pob[i])-1:
            if pob[i-1][j+1] < 4:
                return i-1,j+1
            if pob[i][j+1] < 4:
                return i,j+1
    if i<len(pob)-1:
        if j>0:
            if pob[i+1][j-1] < 4:
                return i+1,j-1
            if pob[i+1][j] < 4:
                return i+1,j
        if j<len(pob[i])-1:
            if pob[i+1][j+1] < 4:
                return i+1,j+1
    return i,j

def nuevoSano(prob,estCub,estCubContagiado,estActual):
    if estCub == "con" and estCubContagiado == "con":
        p=probsPorCubrebocasSano[0][0]
        if prob <p:
            p=0#contagiado
        else:
            p=1
        if p==0:
            return estActual-4
        else:
            return estActual
    elif estCub == "con" and estCubContagiado == "sin":
        p=probsPorCubrebocasSano[1][0]
        if prob <p:
            p=0
        else:
            p=1
        if p==0:
            return estActual-4
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "con":
        p=probsPorCubrebocasSano[2][0]
        if prob <p:
            p=0
        else:
            p=1
        if p==0:
            return estActual-4
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "sin":
        p=probsPorCubrebocasSano[3][0]
        if prob <p:
            p=0
        else:
            p=1
        if p==0:
            return estActual-4
        else:
            return estActual

def nuevoRecuperado(prob,estCub,estCubContagiado,estActual):
    if estCub == "con" and estCubContagiado == "con":
        p=probsPorCubrebocasRec[0][0]
        if prob <p:
            p=0#contagiado
        else:
            p=1
        if p==0:
            return estActual-8
        else:
            return estActual
    elif estCub == "con" and estCubContagiado == "sin":
        p=probsPorCubrebocasRec[1][0]
        if prob <p:
            p=0
        else:
            p=1
        if p==0:
            return estActual-8
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "con":
        p=probsPorCubrebocasRec[2][0]
        if prob <p:
            p=0
        else:
            p=1
        if p==0:
            return estActual-8
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "sin":
        p=probsPorCubrebocasRec[3][0]
        if prob <p:
            p=0
        else:
            p=1
        if p==0:
            return estActual-8
        else:
            return estActual


def nuevoContagiado(prob,estVac,estActual):
    if estVac == "si":
        if prob < probsMuerte[0][2]:
            return estActual+8
        p=probsMuerte[0][0]
        if prob<p:
            return 12
        else:
            return estActual
    else:
        if prob < probsMuerte[1][2]:
            return estActual+8
        p=probsMuerte[1][0]
        if prob<p:
            return 12
        else:
            return estActual

toJson(poblacion)
for dia in range(ndias):
    poblacionma=poblacion.copy()
    for i in range(len(poblacion)):
        for j in range(len(poblacion[i])):
            prob = random.random()
            estContagio = estados[poblacion[i][j]][0]
            estCubrebocas = estados[poblacion[i][j]][1]
            estVacuna = estados[poblacion[i][j]][2]
            if estContagio == "Sano":
                fvac = 0
                if estVacuna == "si":
                    fvac = probsPorVacuna[0][0]
                else:
                    fvac = probsPorVacuna[1][0]
                prob = prob*fvac
                ci, cj=alrededorContagiado(poblacion,i,j)
                if ci!=i and cj!=j:
                    estCubCont = estados[poblacion[ci][cj]][1]
                    newEstado = nuevoSano(prob,estCubrebocas,estCubCont,poblacion[i][j])
                    poblacionma[i][j]=newEstado
            elif estContagio == "Recuperado":
                fvac = 0
                if estVacuna == "si":
                    fvac = probsPorVacuna[0][0]
                else:
                    fvac = probsPorVacuna[1][0]
                prob = prob*fvac
                ci, cj=alrededorContagiado(poblacion,i,j)
                if ci!=i and cj!=j:
                    estCubCont = estados[poblacion[ci][cj]][1]
                    newEstado = nuevoRecuperado(prob,estCubrebocas,estCubCont,poblacion[i][j])
                    poblacionma[i][j]=newEstado
            elif estContagio == "Contagiado":
                poblacionma[i][j] = nuevoContagiado(prob,estVacuna,poblacion[i][j])
    poblacion=poblacionma
    toJson(poblacion)

                    
with open('test.json', 'w') as fout:
    json.dump(resDias , fout)

