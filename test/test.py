from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.common.keys import Keys
global driver
global browser
global binary
import os
from pathlib import Path
drivers = Path(__file__).parent / './drivers'
print(os.name)
print((drivers / 'geckodriver').resolve())
import sys
#sys.path.append(drivers)
if os.name == 'nt':
    binary = FirefoxBinary(str(drivers / 'geckodriver.exe'))
    #driver = webdriver.Firefox(executable_path=str(drivers / 'geckodriver.exe'))
else:
    binary = FirefoxBinary(str((drivers / 'geckodriver').resolve()))
    #driver = webdriver.Firefox() #str(drivers / 'geckodriver'))
#driver = webdriver.Firefox(firefox_binary=binary)
driver = webdriver.Firefox(str((drivers / 'geckodriver')))
#firefox_capabilities = webdriver.DesiredCapabilities.FIREFOX
#firefox_capabilities['marionette'] = True
#firefox_capabilities['binary'] = str(drivers / 'geckodriver')
#driver = webdriver.Firefox(capabilities=firefox_capabilities)
browser = driver
driver.get("http://www.python.org")
assert "Python" in driver.title
elem = driver.find_element_by_name("q")
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.close()
