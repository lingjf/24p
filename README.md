# 24p

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10] * 4

总共有91390种组合,其中79936种有解,有解率87.47%

去重后715种组合,其中566种有解,有解率79.16%


## b/a
```Python
[1, 2, 7, 7]   24=(7*7-1)/2
[3, 8, 8, 10]   24=(8*10-8)/3
[4, 4, 10, 10]   24=(10*10-4)/4
```

## ab/c = (ab)/(xy)
```Python
[6, 9, 9, 10]   24=9*10/6+9
```

## 8/(1/3)
```Python
[1, 3, 4, 6]   24=6/(1-3/4)
[1, 4, 5, 6]   24=6/(5/4-1)
[1, 6, 6, 8]   24=6/(1-6/8)
[3, 3, 8, 8]   23=8/(3-8/3)
```

## (b+c/a)a = ab+c
```Python
[1, 5, 5, 5]   24=(5-1/5)*5
[2, 2, 7, 10]   24=(10/2+7)*2
[2, 4, 10, 10]   24=(4/10+2)*10
[2, 7, 7, 10]   24=(10/7+2)*7
[3, 3, 7, 7]   24=(3/7+3)*7
[4, 4, 7, 7]   24=(4-4/7)*7
```

## (b+c/a)d = (b+c/a)2a = 2(ab+c)
```Python
[2, 5, 5, 10]   24=(5-2/10)*5
```

## ab+ac = a(b+c)
```Python
[1, 5, 6, 6]   24=5*6-1*6
[2, 3, 3, 10]   24=3*10-2*3
[2, 5, 8, 8]   24=5*8-2*8
[5, 6, 6, 9]   24=6*9-5*6
[6, 6, 6, 10]   24=6*10-6*6
[6, 8, 8, 9]   24=8*9-6*8
[7, 8, 8, 10]   24=8*10-7*8
```


```Python
2*12=24
3*8=24
4*6=24
12+12=24
14+10=24
15+9=24
16+8=24
17+7=24
18+6=24
20+4=24
21+3=24
25-1=24
28-4=24
30-6=24
32-8=24
35-11=24
36-12=24
40-16=24

7+8+9=24
8+8+8=24
2*8+8=24
4*8-8=24

```