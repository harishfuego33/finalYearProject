# load_pickle.py
import pickle
import sys

def load_model_and_predict(url, ensemble_model_path, tfidf_vectorizer_path):
    # Load the ensemble model and TF-IDF vectorizer
    with open(ensemble_model_path, 'rb') as model_file:
        ensemble = pickle.load(model_file)

    with open(tfidf_vectorizer_path, 'rb') as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)

    # Example URL for prediction
    new_url = [url]
    new_url.append(url)
    X_predict = vectorizer.transform(new_url)
    predictions = ensemble.predict(X_predict)
    if predictions[0]== 'bad':
        return 'bad'
    else:
        return 'good'

if __name__ == '__main__':
    url = sys.argv[1]
    ensemble_model_path = sys.argv[2]
    tfidf_vectorizer_path = sys.argv[3]
    prediction = load_model_and_predict(url, ensemble_model_path, tfidf_vectorizer_path)
    print(prediction)
