from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.common.keys import Keys
global driver
global browser
import os
#import subprocess
from platform import uname
if os.name == 'posix' and 'Microsoft' in uname().release: # running WSL
    print(os.system('cmd.exe /c "python test.py"'))
    quit()
elif os.name == 'posix':
    driver = webdriver.Firefox()
else:
    driver = webdriver.Firefox(executable_path=r'test/drivers/geckodriver.exe')

browser = driver
driver.get("http://www.python.org")
assert "Python" in driver.title
elem = driver.find_element_by_name("q")
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.close()
