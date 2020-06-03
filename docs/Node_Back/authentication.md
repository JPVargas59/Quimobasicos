# Autenticación de usuarios y manejo de sesiones con JWT

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-   [Autenticación de usuarios y manejo de sesiones con JWT](#autenticación-de-usuarios-y-manejo-de-sesiones-con-jwt)
    -   [Generación de llaves](#generación-de-llaves)
    -   [JWTs](#jwts)
        -   [Flujo de JWTs](#flujo-de-jwts)
        -   [Tipos de token JWT](#tipos-de-token-jwt)

<!-- /code_chunk_output -->

## Generación de llaves

**\*No usar las llaves de ejemplo para ambientes de producción**

En el directorio Node_Back ejecutar los siguientes comandos desde la terminal

```sh
ssh-keygen -t rsa -b 2048 -m PEM -f server.key
```

Es necesario no asignar contraseña al key pair. El archivo tendrá la siguiente estructura

```sh
-----BEGIN RSA PRIVATE KEY----
MIIEpQIBAAKCAQEA8f3rJYrCSX8dN9QQeAsMjzoToQM4nehnr9lHQtkwmvBP6rhh
3elv4NBj2ISBh2vjcTefnk6bK2KK8I083l0x924gvN667tDxF6j3RoozMwqqvWpx
M4BZMKPV7xWbXBBAwoN7aiEobuWUvs+0E3o9CkRLVPv3xbxea0/aW4eLqLtfpAyE
kgxKvPZVIiE5n9gWSyJShrNBdLkmEYs6W6sxgnrrssdE6FA92rb62+LsFieGa/tO
IKndpolI2wASm95u1mCgdsYmI32nBtvd78h7cw8p0SOHTlvNFKI4twRspmb+NyYJ
7ZHe+z6+Y6DWiVzEtcWoA3ZQFBuJPVCP6UGRoQIDAQABAoIBAAFq+3W82maT2Bf7
ph0N84TjUjofSrWiJvlgzIoXu7Est0soyWoDdCRdFDiwjhG9EBgZu1WyIDag3S+L
pE+pPCG3A3oX1ACSONdqpghDxwkFhvpfJUqn9d3TF+3OsppXfgmlu5NjnlkH/1ce
4G88yB7HR6m30DvYXrVCQoVGxgq3C21wkXi07K71lNTFFzrOzZK5PADMeqInlmlm
ynZSTq4cf0E7wXuRehow6CNtW3bO+LiB9Y2UPOeRwgqDA1S10sryDIvTrLMqzOP6
KloHNuCVI8Ir0T6nd0SJaTsgXcfC7Xyj333En+UNLew0c5yJ0stqwT1XiD/tDt5I
mTvZngECgYEA/92SPu8O8mp+mYtN9Ga7Z9+WVau83pNxqR7clKmKi1OI+XzdAefQ
gIzhUzHLhscD7iCq3SO1Fo5djv5/B+qc9eCB9/gKKelyyJ5U815rLjgr04wm737t
VSe4PbC8NEzGrZDgwv1AA8TawSZSB8p+h5WYeUh3RT1szy6Qd8+86ksCgYEA8h56
/3QPFbuf31rgmp/BwrxXgNVOw8p3HEnhZ57yped+XmPoc3Pb9YZ+xMZtd92D6KQx
u/ZtyeO6pwPNJYsnIx1O/z6WTP+1fzkoB8WnXV2LHA/vpimf2pcgzVU3nZkne5qy
hdg+FMMCAaZkQ2s+rvckvqp7UIh6Mn8bFSJIwEMCgYEAoZagHsjBKs2gyH2WrMwY
fOBSxCYisHpzpLgN3IE6MwV9kvqNZP+uyRCv2Oewvpx/WesdnW1Il0cvxPfq5+f+
WrX/vsfSO2foitSbl9tAWz80RnTTvhrt7gKYs7UjFvCJ5OGDYQGpZPf0o1j9I1h6
Ekyir63ZTUwepLWmnVP/3gMCgYEAsqvxopAYDbau7RnYQ+L/DuEEReuju3Ku4W5X
66rtb6bcp3Vc9c4bFR4ScM3pvJn4nPaGSSo6rNDkThnNCxacZBpd0Jh0PBA79M3O
D6Y5svm0DZppBJsU/y+lokFv0FpUO6/WbFU+wv2Bfow201XSJTX2pMmURMLiQl9w
MfFh9JcCgYEAkD8ztHtTE4yjs+JOTa2CedRBD9FkOEfVK3oIcFH2HcTQJnRkWmhK
FJtEJg1up2MkT78qO2hbQdDFQpRt0JBkVreGKp5mol0ZZAoA5w/hg3Jfmfz62Z9U
d0jBeTsf1qAMREHQrB194eXK1RqMepappyv5R4BRFp2GxJUzvwJ0QlA=
-----END RSA PRIVATE KEY-----
```

Este comando creará dos archivos: `server.key` y `server.key.pub`. El segundo comando a ejecutar es el siguiente

```sh
ssh-keygen -f server.key.pub -e -m pem
```

Es necesario copiar el resultado en un nuevo archivo llamado `server.key.pem`. El documento tendrá la siguiente estructura

```sh
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEA8f3rJYrCSX8dN9QQeAsMjzoToQM4nehnr9lHQtkwmvBP6rhh3elv
4NBj2ISBh2vjcTefnk6bK2KK8I083l0x924gvN667tDxF6j3RoozMwqqmWpxM4BZ
MKPV7xWbXBBAwoN7aiEobuWUvs+0E3o9CkRLVPv3xbxea0/aW4eLqLtfpAyEkgxK
vPZVIiE5n9gWSyJShrNBdLkmEYs6W6sxgnrrssdE6FA92rb62+LsFieGa/tOIKnd
polI2wASm95u1mCgdsYmI32nBtvd78h7cw8p0SOHTlvNFKI4twRspmb+NyYJ7ZHe
+z6+Y6DWiVzEtcWoA3ZQFBuJPVCP6UGRoQIDAQAB
-----END RSA PUBLIC KEY-----
```

## JWTs

\*[Artículo original de Hasura](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)

### Flujo de JWTs

![enter image description here](https://hasura.io/blog/content/images/2019/09/Screen-Shot-2019-09-06-at-11.46.03.png)

### Tipos de token JWT

-   jwt_token:
    -   Token que contiene la información del usuario y que le permite hacer queries y mutaciones en GraphQL
    -   Tiene una duración corta (15 minutos) y sólo se almacena en memoria para evitar ataques de XSS y CSRF
    -   Sirve para consultar datos de la sesión en el front end (id, puesto, correo, etc.)
-   jwt_refresh:
    -   Token que se genera al hacer login en la aplicación y sirve para generar nuevos tokens jwt_token
    -   Tiene duración larga (1 día)
    -   Sólo sirve para generar tokens jwt_token
    -   Se puede almacenar seguramente
