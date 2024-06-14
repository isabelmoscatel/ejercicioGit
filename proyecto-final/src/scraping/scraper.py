import requests #Importar el modulo para hacer peticiones http

from bs4 import BeautifulSoup #Analiza documentos html
import pandas as pd #Anlaiza los datos en los dataframes

def fetch_page(url):
   #obtenemos el contenido de una pagina
   response = requests.get(url) #Realizamos una solicitus get
   if response.status_code ==200: #Comparamoe el satuts code 200 peticion exitosa
       return response.content #Devolvemos el contenido de la pag si la solicitud fue exitosa
   else:
       return Exception(f"Failed to fetch page: {url}") #lanzamos una exepcion si la solicitud falla
   


def parse_product(product):
    title = product.find("a", class_="title").text.strip()
    description = product.find("p", class_="description").text.strip()
    price = product.find("h4", class_="price").text.strip()
    return{ #retornamos en un diccionario
        "title":title,
        "description": description,
        "price": price
    }
    
def scrape(url):
    #funcion principal del scraping
    page_content = fetch_page(url)#obtenemos el código base de la pag
    soup = BeautifulSoup(page_content,"html.parser") #analizamos el contenido de la pagina
    print(soup)
    products = soup.find_all("div", class_="thumbnail") #encontramos todos los elementos div con la clase Thumbnail que representa productos
    products_data =[]
    
    for product in products:
        product_info = parse_product(product)
        products_data.append(product_info)
        
    #print(products_data)
    return pd.DataFrame(products_data)



base_url="https://webscraper.io/test-sites/e-commerce/allinone"
   
print(fetch_page(base_url))

df = scrape(base_url)

print(df)

df.to_csv('data/raw/products.csv', index=False)