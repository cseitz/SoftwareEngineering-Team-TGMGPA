#exec(open("./test/test.py").read())
#import importlib
#importlib.import_module('./test/test.py', package='')
import sys
sys.path.append('./test')
import tests
