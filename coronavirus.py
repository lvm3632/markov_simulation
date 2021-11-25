import json
import random as r
from copy import deepcopy

estados = [("Contagiado", "con", "si"), ("Contagiado", "sin", "si"), ("Contagiado", "con", "no"), ("Contagiado", "sin", "no"),
           ("Sano", "con", "si"), ("Sano", "sin","si"), ("Sano", "con", "no"), ("Sano", "sin", "no"),
           ("Recuperado", "con", "si"), ("Recuperado", "sin","si"), ("Recuperado", "con", "no"), ("Recuperado", "sin", "no"),
           ("Muerto", "no aplica", "no aplica")]

# contagiado sin , sano con .7
# contagiado con, sano sin .05
# ambos con .015
probsPorCubrebocasSano = [
    # Contagiado,,Sano
    [.05, .95],  # contagiado con, sano con
    [.015, .985],  # contagiado con, sano sin
    [.7, .3],  # contagiado sin, sano con
    [.9, .1]  # contagiado sin, sano sin
]

probsPorCubrebocasRec = [
    # Contagiado,,Recuperado
    [0, 0],  # contagiado con, recuperado con
    [.5, .5],  # contagiado con, recuperado sin
    [.3, .7],  # contagiado sin, recuperado con
    [1, 1]  # contagiado sin, recuperado sin
]

probsPorVacuna = [
    # Contagiarse,,No contagiarse
    [.15, .85],  # vacunado
    [1, 0]  # no vacunado
]

probsMuerte = [
    # Morir,,No morir,,Recuperarse
    [.05, .95, 1],  # vacunado
    [.55, .45, .5]  # no vacunado
]


def alrededorContagiado(pob, i, j):
    if i > 0:
        if j > 0:
            if pob[i-1][j-1] < 4:
                return i-1, j-1
            if pob[i-1][j] < 4:
                return i-1, j
            if pob[i][j-1] < 4:
                return i, j-1
        if j < len(pob[i])-1:
            if pob[i-1][j+1] < 4:
                return i-1, j+1
            if pob[i][j+1] < 4:
                return i, j+1
    if i < len(pob)-1:
        if j < len(pob[i+1])-1:
            if j > 0:
                if pob[i+1][j-1] < 4:
                    return i+1, j-1
                if pob[i+1][j] < 4:
                    return i+1, j
            if j < len(pob[i])-1:
                if pob[i+1][j+1] < 4:
                    return i+1, j+1
    return i, j


def nuevoSano(prob, estCub, estCubContagiado, estActual):
    if estCub == "con" and estCubContagiado == "con":
        p = probsPorCubrebocasSano[0][0]
        if prob < p:
            p = 0  # contagiado
        else:
            p = 1
        if p == 0:
            return estActual-4
        else:
            return estActual
    elif estCub == "con" and estCubContagiado == "sin":
        p = probsPorCubrebocasSano[1][0]
        if prob < p:
            p = 0
        else:
            p = 1
        if p == 0:
            return estActual-4
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "con":
        p = probsPorCubrebocasSano[2][0]
        if prob < p:
            p = 0
        else:
            p = 1
        if p == 0:
            return estActual-4
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "sin":
        p = probsPorCubrebocasSano[3][0]
        if prob < p:
            p = 0
        else:
            p = 1
        if p == 0:
            return estActual-4
        else:
            return estActual


def nuevoRecuperado(prob, estCub, estCubContagiado, estActual):
    if estCub == "con" and estCubContagiado == "con":
        p = probsPorCubrebocasRec[0][0]
        if prob < p:
            p = 0  # contagiado
        else:
            p = 1
        if p == 0:
            return estActual-8
        else:
            return estActual
    elif estCub == "con" and estCubContagiado == "sin":
        p = probsPorCubrebocasRec[1][0]
        if prob < p:
            p = 0
        else:
            p = 1
        if p == 0:
            return estActual-8
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "con":
        p = probsPorCubrebocasRec[2][0]
        if prob < p:
            p = 0
        else:
            p = 1
        if p == 0:
            return estActual-8
        else:
            return estActual
    elif estCub == "sin" and estCubContagiado == "sin":
        p = probsPorCubrebocasRec[3][0]
        if prob < p:
            p = 0
        else:
            p = 1
        if p == 0:
            return estActual-8
        else:
            return estActual


def nuevoContagiado(prob, estVac, estActual):
    if estVac == "si":
        if prob < probsMuerte[0][2]:
            return estActual+8
        p = probsMuerte[0][0]
        if prob < p:
            return 12
        else:
            return estActual
    else:
        if prob < probsMuerte[1][2]:
            return estActual+8
        p = probsMuerte[1][0]
        if prob < p:
            return 12
        else:
            return estActual


def generarPoblacionDia(ndias, poblacion):
    for dia in range(ndias):
        poblacionma = poblacion
        for i in range(len(poblacion)):
            for j in range(len(poblacion[i])):
                prob = r.random()
                estContagio = estados[poblacion[i][j]][0]
                estCubrebocas = estados[poblacion[i][j]][1]
                estVacuna = estados[poblacion[i][j]][2]
                if estContagio == "Sano":
                    fvac = 0
                    if estVacuna == "si":
                        fvac = probsPorVacuna[0][0]
                    else:
                        fvac = probsPorVacuna[1][0]
                    prob *= fvac
                    ci, cj = alrededorContagiado(poblacion, i, j)
                    if ci != i and cj != j:
                        estCubCont = estados[poblacion[ci][cj]][1]
                        newEstado = nuevoSano(prob, estCubrebocas, estCubCont, poblacion[i][j])
                        poblacionma[i][j] = newEstado
                elif estContagio == "Recuperado":
                    fvac = 0
                    if estVacuna == "si":
                        fvac = probsPorVacuna[0][0]
                    else:
                        fvac = probsPorVacuna[1][0]
                    prob *= fvac
                    ci, cj = alrededorContagiado(poblacion, i, j)
                    if ci != i and cj != j:
                        estCubCont = estados[poblacion[ci][cj]][1]
                        newEstado = nuevoRecuperado(prob, estCubrebocas, estCubCont, poblacion[i][j])
                        poblacionma[i][j] = newEstado
                elif estContagio == "Contagiado":
                    poblacionma[i][j] = nuevoContagiado(prob, estVacuna, poblacion[i][j])
        poblacion = deepcopy(poblacionma)
        toJson(deepcopy(poblacion))
    resDias.update({'datos': datosDias})


def toJson(pob):
    contagiados = 0
    sanos = 0
    recuperados = 0
    muertos = 0
    for l in pob:
        for el in l:
            if el < 4:
                contagiados += 1
            elif el < 8:
                sanos += 1
            elif el < 12:
                recuperados += 1
            else:
                muertos += 1
    obj = {
        'Contagiados': contagiados,
        'Sanos': sanos,
        'Recuperados': recuperados,
        'Muertos': muertos,
        'Clasificacion': round((contagiados + muertos) / npobl, 2),
        'Poblacion': deepcopy(pob)
    }
    datosDias.append(obj)


valido = False
while not valido:
    try:
        npobl = int(input("Ingresa el tamaño de la poblacion: "))
        if npobl <= 0:
            raise ValueError
        valido = True
    except ValueError:
        print("Favor de ingresar un numero entero mayor a 0\n")

valido = False
while not valido:
    try:
        ndias = int(input("Ingresa el numero de dias a analizar: "))
        if ndias <= 0:
            raise ValueError
        valido = True
    except ValueError:
        print("Favor de ingresar un numero entero mayor a 0\n")


# personas cercanas entre si
n = 10

nfilas = npobl // n
residuo = npobl % n

poblacion = list()

for i in range(nfilas):
    fila = list()
    for j in range(n):
        fila.append(r.randint(0, 7))
    poblacion.append(fila)

if residuo > 0:
    fila = list()
    for i in range(residuo):
        fila.append(r.randint(0, 7))
    poblacion.append(fila)

datosDias = list()

resDias = {'poblacion': npobl,
           'dias': ndias,
           'datos': datosDias}

generarPoblacionDia(ndias, poblacion)

with open('test.json', 'w') as fout:
    json.dump(resDias, fout, indent=2)
