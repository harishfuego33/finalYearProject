import pickle
import sys


def makeTokens(f):
    tkns_BySlash = str(f.encode('utf-8')).split('/')	# make tokens after splitting by slash
    total_Tokens = []
    for i in tkns_BySlash:
        tokens = str(i).split('-')	# make tokens after splitting by dash
        tkns_ByDot = []
        for j in range(0,len(tokens)):
            temp_Tokens = str(tokens[j]).split('.')	# make tokens after splitting by dot
            tkns_ByDot = tkns_ByDot + temp_Tokens
        total_Tokens = total_Tokens + tokens + tkns_ByDot
    total_Tokens = list(set(total_Tokens))	#remove redundant tokens
    if 'com' in total_Tokens:
        total_Tokens.remove('com')	#removing .com since it occurs a lot of times and it should not be included in our features
    return total_Tokens

def red_pickle(new_url):
    with open("ensemble_model.pkl",'rb') as model_file:
        ensemble = pickle.load(model_file)

    with open("tfidf_vectorizer.pkl",'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)

    X_predict = vectorizer.transform(new_url)
    Predictions = ensemble.predict(X_predict)
    return (Predictions[0])
    
url = sys.argv[1]
new_url = [url]
output = red_pickle(new_url)
print(output)



