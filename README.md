# Gendiff

[![Actions Status](https://github.com/YaKolyash/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/YaKolyash/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/080281c480052fe2ea33/maintainability)](https://codeclimate.com/github/YaKolyash/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b38ae6aa03684cd9abaf/test_coverage)](https://codeclimate.com/github/YaKolyash/frontend-project-46/test_coverage)

Консольное Node.js приложение для создания различий между конфигурационными файлами. Поддерживаемые форматы: JSON, YAML.

## Как оно работает

Приложение определяет формат файла на основе его расширения. Оно преобразует config в объектную структуру (AST), одинаковую для разных форматов.
Затем приложение создает diff, рекурсивно сравнивая действия с функцией. Наконец, приложение выводит diff в выбранном формате на консоль.

## Примеры:

Первая конфигурация:

```
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

Вторая конфигурация:

```
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}
```

## Вывод

Stylish формат:

```
{
    common: {
      - follow: false
        setting1: Value 1
      + setting2: 200
      - setting3: null
      + setting3: true
      - setting4: blah blah
      - setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: so much
              + wow:
            }
            key: value
          - ops: vops
        }
    }
    group1: {
      - baz: bars
      + baz: bas
        foo: bar
      - nest: str
      + nest: {
            key: value
        }
    }
  + group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  - group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}{
    common: {
      - follow: false
        setting1: Value 1
      + setting2: 200
      - setting3: null
      + setting3: true
      - setting4: blah blah
      - setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: so much
              + wow:
            }
            key: value
          - ops: vops
        }
    }
    group1: {
      - baz: bars
      + baz: bas
        foo: bar
      - nest: str
      + nest: {
            key: value
        }
    }
  + group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  - group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

[![video](https://i.postimg.cc/D4XHdNVD/1.png)](https://asciinema.org/a/KjOiX7qi0waom2wH3AMrGaqkY)

Plain formatter:

```
Property 'common.follow' was removed
Property 'common.setting2' was added with value: 200
Property 'common.setting3' was updated. From null to true
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting6.doge.wow' was updated. From 'so much' to ''
Property 'common.setting6.ops' was removed
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group1.nest' was updated. From 'str' to [complex value]
Property 'group2' was added with value: [complex value]
Property 'group3' was removed
```

[![video](https://i.postimg.cc/YGVTFHPY/2.png)](https://asciinema.org/a/DbfLe0m3pIY6mOIYd3sNlIxh5)

JSON format:

```
[
 {
  "key": "common",
  "status": "nested",
  "children": [
   {
    "key": "follow",
    "status": "deleted",
    "value": false
   },
   {
    "key": "setting1",
    "status": "unchanged",
    "value": "Value 1"
   },
   {
    "key": "setting2",
    "status": "added",
    "value": 200
   },
   {
    "key": "setting3",
    "status": "changed",
    "oldValue": null,
    "newValue": true
   },
   {
    "key": "setting4",
    "status": "deleted",
    "value": "blah blah"
   },
   {
    "key": "setting5",
    "status": "deleted",
    "value": {
     "key5": "value5"
    }
   },
   {
    "key": "setting6",
    "status": "nested",
    "children": [
     {
      "key": "doge",
      "status": "nested",
      "children": [
       {
        "key": "wow",
        "status": "changed",
        "oldValue": "so much",
        "newValue": ""
       }
      ]
     },
     {
      "key": "key",
      "status": "unchanged",
      "value": "value"
     },
     {
      "key": "ops",
      "status": "deleted",
      "value": "vops"
     }
    ]
   }
  ]
 },
 {
  "key": "group1",
  "status": "nested",
  "children": [
   {
    "key": "baz",
    "status": "changed",
    "oldValue": "bars",
    "newValue": "bas"
   },
   {
    "key": "foo",
    "status": "unchanged",
    "value": "bar"
   },
   {
    "key": "nest",
    "status": "changed",
    "oldValue": "str",
    "newValue": {
     "key": "value"
    }
   }
  ]
 },
 {
  "key": "group2",
  "status": "added",
  "value": {
   "abc": 12345,
   "deep": {
    "id": 45
   }
  }
 },
 {
  "key": "group3",
  "status": "deleted",
  "value": {
   "deep": {
    "id": {
     "number": 45
    }
   },
   "fee": 100500
  }
 }
]
```

[![video](https://i.postimg.cc/14nkQ8gH/3.png)](https://asciinema.org/a/R3zulRerANj57N2me72n6jzJh)

## Как установить?

Создать приложение с помощью:

```
make install

npm link
```

Описание:

Сравнивает два конфигурационных файла и показывает разницу.

## Минимальные системные требование

### Operating system: macOC Ventura 13.2

### Node.js: v20.3.1

## Использование:

```
gendiff <filepath1> <filepath2>
```

## Опции:

```
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

## Форматы:

- stylish, output diff with + / - , like git diff (default format)
- plain, output diff as text strings
- json, output diff in JSON format

## Тесты:

Тесты выполняются с помощью Jest.

Запускайте тесты с помощью:

```
make test
```

Конфигурационные файлы и результаты тестов в **tests** и **fixtures**.
