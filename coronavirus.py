

estados = [("Contagiado","con","si"),("Contagiado","sin","si"),("Contagiado","con","no"),("Contagiado","sin","no"),
("Sano","con","si"),("Sano","sin","si"),("Sano","con","no"),("Sano","sin","no"),
("Recuperado","con","si"),("Recuperado","sin","si"),("Recuperado","con","no"),("Recuperado","sin","no"),
("Muerto","no aplica","no aplica")]

#contaggiado sin , sano con .7
#contagiado con, sano sin .05
#ambos con .015
probsPorCubrebocasSano = [
    #Sano con,,Sano sin
    [.05,.015],#contagiado con
    [.7,.9,]#contagiado sin
]

probsPorCubrebocasRec = [
    #Recuperado con,,Recuperado sin
    [.0,.0],#contagiado con
    [.0,.0,]#contagiado sin
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

poblacion = [
    [],
    [],
    []
]