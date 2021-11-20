

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
    [0,0],#contagiado con, recuperado csin
    [0,0],#contagiado sin, recuperado scon
    [0,0]#contagiado sin, recuperado sin
]

probsPorVacuna = [
    #Contagiarse,,No contagiarse
    [0,0],#vacunado
    [0,0]#no vacunado
]

probsMuerte = [
    #morir,,no morir,,recuperarse
    [0,0,0],#vacunado
    [0,0,0]#no vacunado
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

nfilas = npobl%10
residuo = npobl - nfilas
