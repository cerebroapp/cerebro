# -*- coding: utf-8 -*-

import sys
from DictionaryServices import *

def main():
    searchword = sys.argv[1].decode('utf-8')
    wordrange = (0, len(searchword))
    dictresult = DCSCopyTextDefinition(None, searchword, wordrange)
    print dictresult.encode('utf-8')

if __name__ == '__main__':
    main()
