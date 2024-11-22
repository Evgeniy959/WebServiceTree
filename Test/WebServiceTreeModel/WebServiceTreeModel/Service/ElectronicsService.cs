using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using WebServiceTreeModel.Models;
using WebServiceTreeModel.Models.Entity;

namespace WebServiceTreeModel.Service
{
    public class ElectronicsService
    {
        private readonly IMongoCollection<Electronics> _ElectronicsCollection;
        public ElectronicsService(
        IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _ElectronicsCollection = mongoDatabase.GetCollection<Electronics>(
                databaseSettings.Value.CollectionName);
        }
        public async Task<List<Electronics>> GetAsync() =>
        await _ElectronicsCollection.Find(_ => true).ToListAsync();

        public async Task<Electronics?> GetAsync(string id) =>
            await _ElectronicsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Electronics newElectronics) =>
            await _ElectronicsCollection.InsertOneAsync(newElectronics);

        public async Task UpdateAsync(string id, Electronics updatedElectronics) =>
            await _ElectronicsCollection.ReplaceOneAsync(x => x.Id == id, updatedElectronics);

        public async Task RemoveAsync(string id) =>
            await _ElectronicsCollection.DeleteOneAsync(x => x.Id == id);

        public async Task RemoveAllAsync(string id) =>
            await _ElectronicsCollection.DeleteManyAsync(x => x.Id == id || x.ParentReference == id);

    }
}
