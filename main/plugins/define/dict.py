# -*- coding: utf-8 -*-

import sys
from DictionaryServices import *

def main():
    try:
        searchword = sys.argv[1].decode('utf-8')
    except IndexError:
        errmsg = 'You did not enter any terms to look up in the Dictionary.'
        print errmsg
        sys.exit()
    wordrange = (0, len(searchword))
    dictresult = DCSCopyTextDefinition(None, searchword, wordrange)
    print dictresult.encode('utf-8')

if __name__ == '__main__':
    main()
