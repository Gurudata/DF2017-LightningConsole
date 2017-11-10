#!/bin/bash
# Load username and password via arguments
# Load Dataset name via arguments
username=$1;
password=$2;
datasetName=$3;

echo "username $username"
java -jar ./lib/datasetutils-37.0.4-SNAPSHOT.jar  --action load --u $username --p $password --inputFile ../data/$datasetName.csv --dataset $datasetName
