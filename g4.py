
import sys
import math
import random
import itertools
import csv

P = {' ': 0, '+': 1, '-': 1, '*': 2, '/': 2}

def join(a, o, b):
    ea, eb = a['e'], b['e']
    va, vb = eval(a['e']), eval(b['e'])
    c = a['c'] + b['c']
    if P[a['o']] > 0 and P[a['o']] < P[o]:
        ea = '(' + a['e'] + ')'
        c += 4
    if P[b['o']] > 0 and P[o] > P[b['o']]:
        eb = '(' + b['e'] + ')'
        c += 6
    if P[b['o']] > 0 and P[o] == P[b['o']]:
        if (o == '+' or o == '-') or (o == '*' and b['o'] == '*'):
            pass
        else:
            eb = '(' + b['e'] + ')'
            c += 6
    e = ea + o + eb
    if o == '+':
        c += 2
    elif o == '-':
        c += 3
        if va < vb: #减出负数
            c += 30
    elif o == '*':
        if va == 1 and vb == 1: #与1相乘不增加复杂度
            c += 1
        else:
            c += 20
            if va * vb > 24:
                c += 20
    elif o == '/':
        if va == vb: #相同数相除不增加复杂度
            c += 1
        else:
            c += 50
            if vb != 0 and math.modf(va / vb)[0] > 0: # 商为小数
                c += 100
    return {'r': eval(e), 'e': e, 'o': o, 'c': c}

def node1_get(a):
    return [{'r': a, 'e': str(a), 'o': ' ', 'c': 0}]

def node2_get(a, b):
    A = a if isinstance(a, list) else node1_get(a)
    B = b if isinstance(b, list) else node1_get(b)
    z = [ ]
    for a in A:
        for b in B:
            if a['c'] < b['c']:
                z.append(join(b, '+', a))
                z.append(join(b, '*', a))
            else:
                z.append(join(a, '+', b))
                z.append(join(a, '*', b))

            z.append(join(a, '-', b))
            z.append(join(b, '-', a))
            if b['r'] != 0: z.append(join(a, '/', b))
            if a['r'] != 0: z.append(join(b, '/', a))
    return z

def node3_get(a, b, c):
    return node2_get(a, node2_get(b, c)) + \
           node2_get(b, node2_get(a, c)) + \
           node2_get(c, node2_get(a, b))

def node4_get(a, b, c, d):
    return node2_get(node2_get(a, b), node2_get(c, d)) + \
           node2_get(node2_get(a, c), node2_get(b, d)) + \
           node2_get(node2_get(a, d), node2_get(b, c)) + \
           node2_get(a, node3_get(b, c, d)) + \
           node2_get(b, node3_get(a, c, d)) + \
           node2_get(c, node3_get(a, b, d)) + \
           node2_get(d, node3_get(a, b, c))


def show(z, w, n=99999):
    d = list(filter(lambda x: math.isclose(x['r'], w, rel_tol=1e-10), z))
    d.sort(key=lambda x: x['c'])
    i = 0
    e = []
    c = []
    for a in d:
        if i < n and a['e'] not in e and a['c'] not in c:
            e.append(a['e'])
            c.append(a['c'])
            print('{0:>4}={1:<16}{2}'.format(int(a['r']), a['e'], a['c']))
            i += 1

C = [
    1, 1, 1, 1,
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    6, 6, 6, 6,
    7, 7, 7, 7,
    8, 8, 8, 8,
    9, 9, 9, 9,
    10, 10, 10, 10,
]

if __name__ == '__main__':
    v = list(map(lambda x: int(x), sys.argv[1:]))
    n = len(v)
    if n == 0:
        v = list(random.choice(list(itertools.combinations(C,4))))
        print(v)
        input('press for answer')
        n = 4

    if n == 4:
        b = node4_get(v[0], v[1], v[2], v[3])
        show(b, 24)
    if n == 3:
        b = node3_get(v[0], v[1], v[2])
        show(b, 3, 1)
        show(b, 4, 1)
        show(b, 6, 1)
        show(b, 8, 1)
    
