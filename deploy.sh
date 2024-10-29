 #!/bin/bash

#
# /**
# *@Author Akbar Riyan Nugroho
# */
#


echo "Deploy Run .."
echo "Build .."
docker build -t mka/dss --no-cache .
echo "Stop FE MKA DSS .."
docker stop andromedia
echo "remove FE MKA DSS .."
docker rm andromedia
echo "run FE MKA DSS .."
docker run -d --name=fe_dss --restart=always --ip 172.17.0.4 mka/dss
