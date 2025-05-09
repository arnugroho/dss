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
docker stop fe_dss
echo "remove FE MKA DSS .."
docker rm fe_dss
echo "run FE MKA DSS .."
docker run -d --name=fe_dss --restart=always -p 8999:8000 mka/dss
