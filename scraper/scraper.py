from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup
from utils import get_base64, apiResponse

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from user_agents import UserAgents

def scrape(url):
    if "https://" in url: url = url.replace("https://","",1)
    if "http://" in url: url = url.replace("http://","",1)
    if "https://" and "http://" not in url:
        url = "https://" + url

    useragents = UserAgents()
    user_agent = useragents.random_user_agent()

    options = Options()
    options.headless = False
    options.page_load_strategy = 'eager'
    options.add_argument("user-agent={}".format(user_agent))

    # driver = webdriver.Chrome(options=options, executable_path='/home/user/Downloads/chromedriver')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    agent = useragents.get_user_agent(driver)
    print("[+] User Agent in use: ", agent)
    driver.get(url)

    page_source = driver.page_source
    soup = BeautifulSoup(page_source,features="html.parser")
    try:
        if "amazon.com" in url:
            title = soup.select('#landingImage')[0]['alt']
            photo = soup.select('#landingImage')[0]['src']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "ebay.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property*="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "bestbuy.com" in url:
            button = driver.find_element(By.CSS_SELECTOR, '.us-link')
            button.click()
            page_source = driver.page_source
            soup = BeautifulSoup(page_source,features="html.parser")
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property*="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "puma.com" in url:
            WebDriverWait(driver, timeout=5).until(lambda d: d.find_element(By.XPATH, '//*[@id="puma-skip-here"]/div/section/div[1]/section[2]/div[1]/div[1]/img'))
            title = soup.select('title')[0].text
            photo = soup.select('img[data-test-id*="pdp-main-image"]')[0]['src']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "adidas.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property*="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "michaelkors." in url:
            title = soup.select('meta[name*="og:title"]')[0]['content']
            photo = soup.select('meta[Property*="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "fossil.com" in url:
            title = soup.select('title')[0].text
            photo = soup.select('meta[Property*="og:image"]')[0]['content'] # Bug detected
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "aldoshoes.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "amazon.in" in url:
            title = soup.select('#landingImage')[0]['alt']
            photo = soup.select('#landingImage')[0]['src']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "flipkart.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "myntra.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "shopee.com.my" in url:
            WebDriverWait(driver, timeout=5).until(lambda d: d.find_element(By.CSS_SELECTOR, 'meta[Property*="og:image"]'))
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "zalora.com.my" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "apple.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "store.google.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "walmart.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "ashford.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "usa.tommy.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "thomas-earnshaw.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "store.ferrari.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        elif "gucci.com" in url:
            title = soup.select('meta[Property*="og:title"]')[0]['content']
            photo = soup.select('meta[Property="og:image"]')[0]['content']
            data = {"title": title, "photo": photo}
            return apiResponse(data=data)
        else:
            return apiResponse(stack="Invalid URL")
    finally:
        # driver.close()
        driver.quit()