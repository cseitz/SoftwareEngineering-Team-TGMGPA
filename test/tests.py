import sys
sys.path.append('./test/tests')

from driver import driver, Keys
driver.get("http://www.python.org")
assert "Python" in driver.title
elem = driver.find_element_by_name("q")
elem.clear()
elem.send_keys("pycon")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source

#import test_example
#import test_printtaskbook
#import test_class
import test_duedates
driver.close()
