import pandas as pd #importamos la libreria para mejorar y analizar datos
import os #Importamos el modulo os para interactuar con el sistema operativo
from ..decorators.decorators import timeit, logit

@logit #añadimos el loggin de la funcion
@timeit
def load_data(data_path):
    #Cargar los datos desde un archivo csv o excel, en nuestro caso el archivo ptoducts,csv
    
    if data_path.endswith(".csv"): #cargamos los datos al cv
        df = pd.read_csv(data_path)
        
    elif data_path.endswith(".xlsx"):#cargamos los datos al excel
        df = pd.read_excel(data_path)
        
    else: 
        raise ValueError("Unsupported file format")#lanzamos un error si el formato no es compatible
    print("Data loaded successfully")
    
    return df


def clean_data(df):
    df["price"]=df["price"].replace(r"[\$,]"," ", regex=True).astype(float)
    print("Data cleaned Successfuly")
    return df


def analyze_data(df):
    print("Basic Data Analysis")
    print(df.describe())
    print("\nProducts with highest prices: ")
    highestPrices = df.nlargest(5,"price")
    
    print(highestPrices)
    return highestPrices
 
    
def save_clean_data(df, outputh_path):
    if outputh_path.endswith(".csv"):
        df.to_csv(outputh_path, index=False)#guardamos la data en el archivo csv
    elif outputh_path.endswith(".xlsx"):
        df.to_excel(outputh_path, index=False)#guardamos la data en el archivo excel
    else: 
        raise ValueError("Unsupported file format")#lanzamos un error si el formato no es compatible
    print(f"Data fuardad en {outputh_path}")
    
if __name__ == "__main__": #Permitimos que el script solo se ejecute en este archivo
    data_path = 'data/raw/products.csv'
    outputh_path = 'data/processed/cleaned_products.csv'
    
    df= load_data(data_path)
    df=clean_data(df)
    df = analyze_data(df)
    os.makedirs('data/processed', exist_ok=True)
    save_clean_data(df, outputh_path)
    
#Ejecutar con python -m src.analysis.analysis
